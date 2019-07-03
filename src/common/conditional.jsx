const Conditional = props => {
  console.log(props);
  return !!props.if && props.children;
};
//usage         <Conditional if={name.trim() !== ""}>
export default Conditional;
