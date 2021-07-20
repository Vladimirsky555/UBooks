export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

// Получаем с сервера
export interface FbResponce {
  name: string;
}

// Отправляем на сервер
export interface TextItem {
  id?: string;
  category: string;
  book: string;
  chapter: string;
  section: string;
  text?: string;
}
