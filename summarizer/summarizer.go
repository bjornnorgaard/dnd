package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	start := time.Now()

	dir := os.Args[0]
	dir = filepath.Dir(dir)
	fmt.Println("Current directory:", dir)

	var lines []string
	err := filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			return nil
		}

		if !strings.Contains(d.Name(), ".md") {
			return nil
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		summary := extractSummary(string(content))
		if len(summary) == 0 {
			fmt.Println("No summary found in", d.Name())
			return nil
		}

		heading := strings.TrimSuffix(d.Name(), filepath.Ext(d.Name()))
		lines = append(lines, fmt.Sprintf("## %s\n\n%s\n\n", heading, summary))

		return nil
	})
	check(err, "Error walking through files:")

	path := filepath.Join(dir, fmt.Sprintf("%s - Summary.md", time.Now().Format("2006-01-02")))
	content := strings.Join(lines, "\n")

	err = os.WriteFile(path, []byte(content), 0644)
	check(err, "Error writing to file:")

	fmt.Printf("Summaries have been written to '%s' in %v\n", path, time.Since(start))
}

func check(err error, message string) {
	if err != nil {
		fmt.Println(message, err)
		os.Exit(1)
	}
}

func extractSummary(content string) string {
	lines := strings.Split(content, "\n")
	var summaryLines []string
	isSummary := false

	for _, line := range lines {
		if strings.Contains(line, "## Summary") && !isSummary {
			isSummary = true
			continue
		}
		if strings.Contains(line, "## ") && isSummary {
			break
		}
		if !isSummary {
			continue
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		summaryLines = append(summaryLines, line)
	}

	return strings.Join(summaryLines, "\n")
}
