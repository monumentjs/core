import {UriAttributes} from '../../../..//Net/Uri/UriAttributes';
import {DefaultSchemePort} from '../../../..//Net/Uri/DefaultSchemePort';
import {Map} from '../../../../../collections-core/main/Map';
import {ListMap} from '../../../../../collections/main/ListMap';

const parsedUriList: Map<string, UriAttributes> = new ListMap();


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
