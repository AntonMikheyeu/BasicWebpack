import Post from '@models/post';
import '@/styles/styles.css';
import some from '@assets/some';
import hourseIcon from '@assets/hourse.jpg';
import note from '@assets/note.xml';
import people from '@assets/people.csv';
import '@/styles/less.less';
import '@/styles/scss.scss';
import './babel';
import './typescript';
import SomeComponent from './react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';


const post = new Post("First", hourseIcon);

import('jquery').then($ => {
  console.log($);
  $.default('pre').html(post.toString());
});

console.log(post + '');

console.log(some);

console.log("XML", note);

console.log("CSV", people);

console.log(SomeComponent);

ReactDOM.render(
  <SomeComponent />,
  document.getElementById('react-component')
);
