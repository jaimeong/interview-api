package models

type User struct {
	ID        string `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Usernamee string `json:"username"`
	Password  string `json:"password"`
}
