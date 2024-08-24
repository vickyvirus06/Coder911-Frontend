import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

const Menu = () => {
  return (
    <ListGroup>
        <Link className='list-group-item list-group-item-action' tag="a" to="/home" action>Home</Link>
        <Link className='list-group-item list-group-item-action' tag="a" to="/askQuery" action>Ask Query</Link>
        <Link className='list-group-item list-group-item-action' tag="a" to="/view-queries" action>Questions</Link>
        <Link className='list-group-item list-group-item-action' tag="a" to="#" action>About</Link>
        <Link className='list-group-item list-group-item-action' tag="a" to="#" action>Contact</Link>
    </ListGroup>
  )
}

export default Menu
