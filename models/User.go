package models

type User struct {
	ID         string      `json:"id"`
	Firstname  string      `json:"firstname"`
	Lastname   string      `json:"lastname"`
	Interviews []Interview `json:"interviews"`
}
