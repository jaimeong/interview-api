package models

type Interview struct {
	Interviewer string  `json:"interviewer"`
	Interviewee string  `json:"interviewee"`
	ID          string  `json:"id"`
	Date        string  `json:"date`
	Party       []User  `json:"party"`
	Score       float32 `json:"score"`
}
