package models

import "time"

type Interview struct {
	ID           string    `json:"id"`
	Interviewee  string    `json:"interviewee"`
	Date         time.Time `json:"date"`
	Interviewer  string    `json:"interviewer"`
	QuestionData []struct {
		ID       int       `json:"id"`
		Type     string    `json:"type"`
		Question string    `json:"question"`
		Response string    `json:"response"`
		Notes    string    `json:"notes"`
		Date     time.Time `json:"date"`
		Score    string    `json:"score"`
	} `json:"questionData"`
}
