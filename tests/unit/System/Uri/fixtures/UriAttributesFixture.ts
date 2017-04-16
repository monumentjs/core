import KeyValueCollection from '../../../../../src/Core/Collections/KeyValueCollection';
import {IUriAttributes} from '../../../../../src/System/Uri/types';
import {DefaultSchemePort} from '../../../../../src/System/Uri/DefaultSchemePort';


const parsedUriList: KeyValueCollection<string, IUriAttributes> = new KeyValueCollection<string, IUriAttributes>();


parsedUriList.put('https://www.example.com:8080/post?id=123&date=2017-03-25#comment-456', {
    scheme: 'https',
    authority: 'www.example.com:8080',
    userName: '',
    password: '',
    host: 'www.example.com',
    port: 8080,
    path: '/post',
    query: 'id=123&date=2017-03-25',
    fragment: 'comment-456'
});

parsedUriList.put('https://www.example.com/post?id=123&date=2017-03-25#comment-456', {
    scheme: 'https',
    authority: 'www.example.com',
    userName: '',
    password: '',
    host: 'www.example.com',
    port: DefaultSchemePort.https,
    path: '/post',
    query: 'id=123&date=2017-03-25',
    fragment: 'comment-456'
});

parsedUriList.put('www.example.com:8080/post?id=123&date=2017-03-25#comment-456', {
    scheme: '',
    authority: 'www.example.com:8080',
    userName: '',
    password: '',
    host: 'www.example.com',
    port: 8080,
    path: '/post',
    query: 'id=123&date=2017-03-25',
    fragment: 'comment-456'
});

parsedUriList.put('www.example.com/post?id=123&date=2017-03-25#comment-456', {
    scheme: '',
    authority: 'www.example.com',
    host: 'www.example.com',
    userName: '',
    password: '',
    port: undefined,
    path: '/post',
    query: 'id=123&date=2017-03-25',
    fragment: 'comment-456'
});

parsedUriList.put('www.example.com/post?id=123&date=2017-03-25', {
    scheme: '',
    authority: 'www.example.com',
    host: 'www.example.com',
    userName: '',
    password: '',
    port: undefined,
    path: '/post',
    query: 'id=123&date=2017-03-25',
    fragment: ''
});

parsedUriList.put('www.example.com/post', {
    scheme: '',
    authority: 'www.example.com',
    userName: '',
    password: '',
    host: 'www.example.com',
    port: undefined,
    path: '/post',
    query: '',
    fragment: ''
});

parsedUriList.put('/post', {
    scheme: '',
    authority: '',
    userName: '',
    password: '',
    host: '',
    port: undefined,
    path: '/post',
    query: '',
    fragment: ''
});


export default parsedUriList;
