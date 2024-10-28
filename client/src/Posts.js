import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Posts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [updatedPost, setUpdatePost] = useState({})

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        axios.get('/posts')
            .then((res) => {
                console.log(res)
                setPosts(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const deletePost = (id) => {
        axios.delete(`/delete/${id}`).then(res => console.log(res)).catch(err => console.log(err))

        window.location.reload()
    }

    const updatePost = (post) => {
        setUpdatePost(post)
        handleShow()
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setUpdatePost(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const saveUpdatedPost = () => {
        axios.put(`/update/${updatedPost._id}`, updatedPost).then(res => console.log(res)).catch(err => console.log(err))

        handleClose()
        window.location.reload()
    }

    return (
        <div style={{ width: '90%', textAlign: 'center', margin: 'auto auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '5px', color: '#59981A' }} >
                <FontAwesomeIcon icon={faBriefcase} size='3x' />
                <h1 style={{ marginLeft: '1rem' }} >Application List</h1>
            </div>

            <Button variant='outline-dark' style={{ width: '100%', marginRight: '1rem' }} onClick={() => navigate(-1)}>BACK</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Control style={{ marginBottom: '1rem' }} placeholder='Updated Company' name='title' value={updatedPost.title ? updatedPost.title : ''} onChange={handleChange} />
                            <Form.Control style={{ marginBottom: '1rem' }} placeholder='Updated Position' name='position' value={updatedPost.position ? updatedPost.position : ''} onChange={handleChange} />
                            <Form.Control style={{ marginBottom: '1rem' }} placeholder='Updated Description' name='description' value={updatedPost.description ? updatedPost.description : ''} onChange={handleChange} />
                            <Form.Control style={{ marginBottom: '1rem' }} placeholder='Updated Status' name='status' value={updatedPost.status ? updatedPost.status : ''} onChange={handleChange} />
                            <Form.Control style={{ marginBottom: '1rem' }} placeholder='Updated applyLink' name='applyLink' value={updatedPost.applyLink ? updatedPost.applyLink : ''} onChange={handleChange} />
                            <Form.Control placeholder='Updated Location' name='location' value={updatedPost.location ? updatedPost.location : ''} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUpdatedPost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {posts ? (
                <>
                    {posts.map((post) => {
                        return (

                            <div key={post._id} style={{ border: 'solid lightgray 2px', borderRadius: '8px', marginTop: '1rem', padding: '1rem' }}>

                                <table style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Company</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{post.title}</td>
                                            <td>{post.description}</td>
                                            <td>{post.status}</td>
                                            <td>{post.location}</td>
                                            <td>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <Button onClick={() => updatePost(post)} variant='outline-info' style={{ width: '50%', marginRight: '1rem' }}>Update</Button>
                                                    <Button onClick={() => deletePost(post._id)} variant='outline-danger' style={{ width: '50%' }}>Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                        )
                    })}
                </>
            ) : ''}
        </div >
    )
}

export default Posts