import * as ReactDOM from 'react-dom/client'
import * as React from 'react'
import { generateGradient, getMatchingPosts } from '#shared/blog-posts'

function App() {
	const [query, setQuery] = React.useState('')
	// 🐨 call useState here and initialize the query with an empty string
	// 💰 we don't need the query yet, but you can console.log it if you want

	return (
		<div className="app">
			<form>
				<div>
					<label htmlFor="searchInput">Search:</label>
					<input
						id="searchInput"
						name="query"
						type="search"
						onChange={event => setQuery(event.currentTarget.value)}
						// 🐨 add an onChange handler here that calls setQuery with the event.currentTarget.value
					/>
				</div>
				<div>
					<label>
						<input type="checkbox" /> 🐶 dog
					</label>
					<label>
						<input type="checkbox" /> 🐱 cat
					</label>
					<label>
						<input type="checkbox" /> 🐛 caterpillar
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
			{/* 🐨 pass the query state as a prop */}
			<MatchingPosts query={query} />
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="post-list">
			{matchingPosts.map(post => (
				<li key={post.id}>
					<div
						className="post-image"
						style={{ background: generateGradient(post.id) }}
					/>
					<a
						href={post.id}
						onClick={event => {
							event.preventDefault()
							alert(`Great! Let's go to ${post.id}!`)
						}}
					>
						<h2>{post.title}</h2>
						<p>{post.description}</p>
					</a>
				</li>
			))}
		</ul>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
