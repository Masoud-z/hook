import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { generateGradient, getMatchingPosts } from '#shared/blog-posts'

function App() {
	const [query, setQuery] = useState('')
	// 🐨 move the words variable from handleCheck to here
	// 🦉 this is deriving state!

	// 🐨 create a dogChecked variable that is whether words includes "dog"
	// and do the same for "cat" and "caterpiller"
	// 🦉 this is deriving state from derived state!

	function handleCheck(tag: string, checked: boolean) {
		// 🐨 move the words variable up to just below the useState call
		const words = query.split(' ')
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="app">
			<form>
				<div>
					<label htmlFor="searchInput">Search:</label>
					<input
						id="searchInput"
						name="query"
						type="search"
						value={query}
						onChange={e => setQuery(e.currentTarget.value)}
					/>
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							// 🐨 control the checked state of this checkbox by setting the checked prop
							checked={query.includes('dog')}
							onChange={e => handleCheck('dog', e.currentTarget.checked)}
						/>{' '}
						🐶 dog
					</label>
					<label>
						<input
							type="checkbox"
							// 🐨 control the checked state of this checkbox by setting the checked prop
							checked={query.includes('cat')}
							onChange={e => handleCheck('cat', e.currentTarget.checked)}
						/>{' '}
						🐱 cat
					</label>
					<label>
						<input
							type="checkbox"
							// 🐨 control the checked state of this checkbox by setting the checked prop
							checked={query.includes('caterpillar')}
							onChange={e =>
								handleCheck('caterpillar', e.currentTarget.checked)
							}
						/>{' '}
						🐛 caterpillar
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
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
