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
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav> 
    <ol>
      {lis}
    </ol>
</nav>      
}

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(title);
  const [body, setBody] = useState(body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onUpdate(title, body);
  }}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
      setTitle(event.target.value);
    }} /></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
  </form>
</article>
}

function App() {
  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // const setMode = _mode[1]
  // 위의 세줄은 아래의 한줄로 대체될 수 있다. 
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  //topics는 App 내부에서 변하지 않기 때문에 const로 설정한다.
  const [topics, setTopics] = useState([
    {id:1, title: "html", body: "html is..."},
    {id:2, title: "css", body: "css is..."},
    {id:3, title: "js", body: "js is..."}
  ]);
  let content = null;
  let contextControl = null;

  if(mode==='WELCOME'){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  }else if(mode==='READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={'/update/' + id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
  }else if(mode==='CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:  nextId, title: _title, body: _body};
      //title과 body를 topics에 업데이트해주려면..?
      const newTopics = [...topics]
      newTopics.push(newTopic);
      // 원본 전체를 그냥 복제본으로 바꾸는 건가?..
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  }else if(mode==='UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content=<Update title={title} body={body} onUpdate={(title, body)=>{
    }}></Update>
  };
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode("CREATE");
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div> 
  );
}

export default App;