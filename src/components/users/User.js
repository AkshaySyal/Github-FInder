import React, { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'

function User(props) {
    const githubContext = useContext(GithubContext)

    useEffect(() => {
        githubContext.getUser(props.match.params.login)
        githubContext.getRepos(props.match.params.login)
    }, [])



    const { name,
        avatar_url,
        location,
        bio,
        blog,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = githubContext.user;

    if (githubContext.loading) return <Spinner />

    return (
        <>
            <Link to="/" className="btn btn-light">Back</Link>

                Hireable:{' '}
            {hireable ? <i className="fas fa-check text-success" /> :
                <i className="fas fa-times-circle text-danger" />}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url}
                        className='round-img'
                        style={{ width: '150px' }} />

                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </>}
                    <a href={html_url} className="btn btn-dark my-1">
                        Visit Github Profile
                        </a>
                    <ul>
                        <li>
                            <strong>Username: </strong>{name}
                        </li>
                        <li>
                            <strong>Company: </strong>{company}
                        </li>
                        <li>
                            <strong>Website: </strong>{blog}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>

            <Repos repos={githubContext.repos} />
        </>
    )

}

export default User