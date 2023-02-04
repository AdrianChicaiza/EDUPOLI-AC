import "./imageAvatar.css"
const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright ©Adrian Chicaiza ${year}`}</footer>;
};

export default Footer;
