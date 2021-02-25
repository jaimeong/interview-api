package models

type Interview struct {
	ID    string  `json:"id"`
	Date  string  `json:"date`
	Party []User  `json:"party"`
	Score float32 `json:"score"`
}
