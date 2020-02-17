export default class Post {
  constructor(title, img){
    this.title = title;
    this.img = img;
    this.date = new Date();
  }

  toString() {
    return `${this.title} - ${this.date} - ${this.img}`;
  }
}