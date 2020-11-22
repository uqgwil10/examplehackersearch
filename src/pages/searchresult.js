import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link'

export class searchresult extends Component {
    render() {
        return (
            <div>
                <Button color="inherit" component={Link} to ="/">
                Home
                </Button>
            </div>
        )
    }
}

export default searchresult
