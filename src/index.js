import Post from '@models/post';
import '@/styles/styles.css';
import some from '@assets/some';
import hourseIcon from '@assets/hourse.jpg';
import note from '@assets/note.xml';
import people from '@assets/people.csv';
import * as $ from 'jquery';
import '@/styles/less.less';


const post = new Post("First", hourseIcon);

$('pre').html(post.toString());

console.log(post + '');

console.log(some);

console.log("XML", note);

console.log("CSV", people);
