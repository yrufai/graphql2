const message = "some message from mymodule.js";
const name = "mr snaps";
const location = "cape coast";

const getGreeting = name => {
  return `welcome to the course ${name}`;
};
export { message, name, getGreeting, location as default };
