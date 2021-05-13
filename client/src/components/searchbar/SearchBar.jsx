import React,{useState} from 'react'
import axios from 'axios'

const SearchBar = ({ merchData }) => {
console.log('heyo', merchData);
	return (
		<div>
			<div>
				<h1></h1>
			</div>
		</div>
	)
}

export default SearchBar




























// import React, { useState, useEffect } from 'react'

// import axios from 'axios'


// const SearchBar = () => {
// const [getMerchants, setGetMerchants] = useState([])
// 	useEffect(() => {
// 		const getMerchants = async() => {
// 			const res = await axios.get('/merchants')
// 			const { data } = res;
// 			console.log('merchants here in searchbar', data)
// 		}
// 	}, [])

// 	return (
// 		<div>
// 			<button 
// 			onClick={async () =>{
// 				try {
					
// 				} catch (error) {
					
// 				}
// 			}}
// 			>this</button>
// 		</div>
// 	)

// }

// export default SearchBar