package models

import "time"

type Schedule struct {
	CalendarID string    `json:"calendarId"`
	Category   string    `json:"category"`
	Title      string    `json:"title"`
	Start      time.Time `json:"start"`
	End        time.Time `json:"end"`
	ID         string    `json:"id"`
	BgColor    string    `json:"bgColor"`
	IsVisible  bool      `json:"isVisible"`
	Location   string    `json:"location"`
}
