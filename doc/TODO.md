# Minimal thing to get working

 - DONE: finish summary store
 - DONE: move "sdk" bits over to "matrix" directory
 - DONE: add eventemitter
 - DONE: make sync work
 - DONE: store summaries
 - setup editorconfig
 - DONE: setup linting (also in editor)
 - DONE: store timeline
 - DONE: store state
 - make summary work better (name and joined/inviteCount doesn't seem to work well)
 - timeline doesn't seem to recover it's key well upon loading, the query in load seems to never yield an event in the persister
 - map DOMException to something better
 	- it's pretty opaque now when something idb related fails. DOMException has these fields:
 		code: 0
		message: "Key already exists in the object store."
		name: "ConstraintError"
 - emit events so we can start showing something on the screen maybe?
 - move session._rooms over to Map, so we can iterate over it, ...
 - build a very basic interface with
 	- a start/stop sync button
 	- a room list sorted alphabetically
 	- clicking on a room list, you see messages (userId -> body)