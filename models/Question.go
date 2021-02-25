package models

type Question struct {
	Category string  `json:"category"`
	Question string  `json:"question"`
	Answer   string  `json:"answer"`
	Score    float32 `json:score`
}
