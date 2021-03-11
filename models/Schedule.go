package models

type Schedule struct {
	CalendarID string `json:"calendarId"`
	Category   string `json:"category"`
	Title      string `json:"title"`
	Start      uint32 `json:"start"`
	End        uint32 `json:"end"`
	ID         string `json:"id"`
	BgColor    string `json:"bgColor"`
	IsVisible  bool   `json:"isVisible"`
	Location   string `json:"location"`
}
