// import React from 'react';

// class Orientation extends React.Component {
//     state = {
//         age: 25,
//         genre: "Woman"
//     };

//     render() {
//         return (
//             <div id="orientationBox">
//                 <div id="genre&age">
//                     <span id="genre">a { this.state.genre }</span>
//                     <span id="age">{ this.state.age } years old</span>
//                 </div>
//                 <div id="orientation">
//                     <input type="checkbox" name="hetero"></input>
//                     <label htmlFor="hetero">Hetero</label>
//                     <input type="checkbox" name="bi"></input>
//                     <label htmlFor="bi">Bi</label>
//                     <input type="checkbox" name="gay"></input>
//                     <label htmlFor="gay">Gay</label>
//                 </div>
//             </div>
//         );
//     }
// }

// class Bio extends React.Component {
//     //need to get already existing bio
//     render() {
//         return (
//             <div id="bio">
//                 <input placeholder="write something about yourself..."></input>
//                 <button type="submit" name="submit">Save</button>
//             </div>
//         );
//     }
// }

// const Hashtag = (props) => {
//     return (
//         <div className="hashtag" onClick={() => props.addHashtag(props.id)}>
//             <span id={ props.id }>
//                 #{ props.name }
//             </span>
//         </div>
//     )
// }

// class Hashtags extends React.Component {
//     state = {
//         hashtagsChoices: [     //requet the api to get list of exsiting #
//             {
//                 name:"geek",
//                 id: 1
//             },
//             {
//                 name:"yogalover",
//                 id: 2
//             },
//             {
//                 name:"catperson",
//                 id: 3
//             },
//             {
//                 name:"naturelover",
//                 id: 4
//             },
//             {
//                 name:"townie",
//                 id: 5
//             }
//         ],
//         hashtagsSelected: [     //get selected # for current user
//             {
//                 name:"yogalover",
//                 id: 2
//             }
//         ]
//     };

//     handleAddHashtag = (id) => {
//         this.setState( prevState => {
//             console.log(id);
//             return {
//                 // add # to hashtag selected
//             };
//         });
//     }

//     render() {
//         return(
//             <div id="hashtags">
//                 <div id="hashtagsSelected">
//                     {this.state.hashtagsSelected.map( hashtag =>
//                     <Hashtag 
//                         name={hashtag.name}
//                         id={hashtag.id}
//                         key={hashtag.id.toString()}
//                     />
//                     )}
//                 </div>
//                 <div id="hashtagsInput">
//                     <form>
//                         <input placeholder="#" maxLength="25"></input><button type="submit">ok</button>
//                     </form>
//                     <div id="hashtagsChoices">
//                         {this.state.hashtagsChoices.map( hashtag =>
//                         <Hashtag 
//                             name={hashtag.name}
//                             id={hashtag.id}
//                             key={hashtag.id.toString()}
//                             addHashtag={this.handleAddHashtag}
//                         />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// class Profile extends React.Component {
//     render() {
//         return(
//             <div id="profileManagement">
//                 <h1>I am...</h1>
//                 <Orientation />
//                 <Bio />
//                 <Hashtags />
//             </div>
//         );
//     }
// }

// export default Profile;