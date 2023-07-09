import './App.css';
import {useState} from 'react';

function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
  </article>
}

function Header(props){
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault(); //a태그가 동작하는 기본 동작을  방지한다. -> 클릭해도 리로드되지 않는다. 
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
} 

function Nav(props){
  const lis = [
  ]
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    // key는 컴포넌트 전체가 아니라 함수 내에서 고유한 key면 된다. 
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }
  return <nav> 
    <ol>
      {lis}
    </ol>
</nav>      
}

function App() {
  const _mode = useState("READ");
  const mode = _mode[0];
  const setMode = _mode[1]
  //topics는 App 내부에서 변하지 않기 때문에 const로 설정한다.
  const topics = [
    {id:1, title: "html", body: "html is..."},
    {id:2, title: "css", body: "css is..."},
    {id:3, title: "js", body: "js is..."}
  ]
  let content = null;
  if(mode==='WELCOME'){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  }else if(mode==='READ'){
    content = <Article title="Read" body="Hello, Read"></Article>
  };
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        mode = "WELCOME"
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        mode="READ"
      }}></Nav>
      {content}
    </div> 
  );
}

export default App;