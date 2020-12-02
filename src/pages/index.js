import React, { useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import shortid from "shortid"

const GET_NOTES = gql`
  query {
    listNotes {
    id
    url
    desc
  }
  }
`


const CREATE_NOTES = gql`
  mutation createNote( $note: NoteInput!) {
    createNote(note:$note) {
      id
      url
      desc
    }
  }
`


const Index = () => {
  const [url,setURL] = useState("")
  const [desc,setDesc] = useState("")
  const { data, loading } = useQuery(GET_NOTES)
  const [createNote] = useMutation(CREATE_NOTES)
    
  const handleSubmit = async () => {
    const note = {
      id: shortid.generate(),
      url,
      desc,
    }
    console.log("Creating Todo:", note)
    setURL("")
    await createNote({
      variables: {
        note,
      },
      refetchQueries:[{query:GET_NOTES}]
    }
    
    )
  }

  return (
    <div>
      <div>
      {loading && <h1>Loading ...</h1>}
        <label> Add Book Marks
        <input
        value={url}
        type="text"
        placeholder="URL "
        onChange={({ target }) => setURL(target.value)}
        />
        <input
        value={desc}
        type="text"
        placeholder="Description "
        onChange={({ target }) => setDesc(target.value)}
        />
        </label>
        <button
        onClick={() => handleSubmit()}
        >Add book mark</button>
      </div>


      {!loading &&
        data &&
        data.listNotes.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.url} {item.desc}
          </div>
        ))}
    </div>
  )
}

export default Index
