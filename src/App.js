import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
	const [repositories, setRepositories] = useState([])
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [techs, setTechs] = useState('')

	useEffect(() => {
		api.get('/repositories').then(repositories => setRepositories(repositories.data))
	}, [])

	async function handleAddRepository() {
		const techsArray = techs.split(',')

		const repository = {
			title,
			url,
			techs: techsArray,
		}

		const { data } = await api.post('/repositories', repository)

		setRepositories([...repositories, data])
	}

	async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`)

		setRepositories(repositories.filter(repository => repository.id !== id))
	}

	return (
		<div className='repository-list'>
			<section>
				<h1>Cadastrar projeto</h1>
				<input name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' required />
				<br />
				<input name='url' value={url} onChange={e => setUrl(e.target.value)} placeholder='URL' required />
				<br />
				<input name='Techs' value={techs} onChange={e => setTechs(e.target.value)} placeholder='Techs' required />
				<button onClick={handleAddRepository}>Adicionar</button>
			</section>

			<article>
				<ul data-testid='repository-list'>
					{repositories.map(repository => (
						<div key={repository.id} className='repository'>
							<li>
								<h1>
									<span>Nome do Repositório </span>
									<p>{repository.title}</p>
								</h1>

								<h1>
									<span>Site do Repositório </span>
									<p>{repository.url}</p>
								</h1>
								<h1>
									<span>Tecnologias </span>
									<p>{repository.techs}</p>
								</h1>
								<h1>Likes: {repository.likes}</h1>
								<button className='remover' onClick={() => handleRemoveRepository(repository.id)}>
									Remover
								</button>
							</li>
						</div>
					))}
				</ul>
			</article>
		</div>
	)
}

export default App
