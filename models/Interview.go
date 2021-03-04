package models

type Interview []struct {
	// ID           string         `json:"id,omitempty"`
	Interviewer  string         `json:"interviewer,omitempty"`
	Interviewee  string         `json:"interviewee,omitempty"`
	QuestionData []QuestionData `json:"questionData,omitempty"`
}
