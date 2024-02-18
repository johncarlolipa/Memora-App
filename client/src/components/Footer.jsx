function Footer() {
  return (
    <footer className="bg-romance text-white text-center py-4 h-[100px]">
      <div>
        <span>Memora</span>
      </div>
      &copy; CopyRight {new Date().getFullYear()}
      <div>
        Created by&nbsp;
        <a href="https://github.com/johncarlolipa" target="_blank" rel="noreferrer noopener">John Carlo Lipa</a>
      </div>
    </footer>
  );
}

export default Footer;
