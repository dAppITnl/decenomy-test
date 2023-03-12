// Object with some textual values
const decenomyObject = {
	name: "Nick",
	project: "Decenomy 2.0",
	location: "Malta"
}
console.log("decenomyObject: ", decenomyObject);

// Copy the object
const copyOfDecenomyObject = { ...decenomyObject };
console.log("copied: ", copyOfDecenomyObject);

// Modify some properties
copyOfDecenomyObject.name = "Cas";
copyOfDecenomyObject.location = "The Netherlands";

// 1: Iterate through it
for(const [key, val] of Object.entries(copyOfDecenomyObject)) {
	console.log(`1 Entry: ${key} = ${val}`);
}

// 2: Alternative iteration
Object.keys(copyOfDecenomyObject).forEach(key => {
	console.log(`2 Entry: ${key} = ${copyOfDecenomyObject[key]}`);
})

// 3: Another alternative
for(const key in copyOfDecenomyObject) {
	if (copyOfDecenomyObject.hasOwnProperty(key)) {
		 console.log(`3 Entry: ${key} = ${copyOfDecenomyObject[key]}`);
	}
}
