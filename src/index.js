import Post from './post';
import './styles/styles.css';
import some from './assets/some';
import hourseIcon from './assets/hourse.jpg';
import note from './assets/note.xml';
import people from './assets/people.csv';


const post = new Post("First", hourseIcon);

console.log(post + '');

console.log(some);

console.log("XML", note);

console.log("CSV", people);
