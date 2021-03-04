package models

import "time"

type QuestionData struct {
	ID       int       `json:"id"`
	Type     string    `json:"type"`
	Question string    `json:"question"`
	Response string    `json:"response"`
	Notes    string    `json:"notes"`
	Date     time.Time `json:"date"`
	Score    string    `json:"score"`
}
