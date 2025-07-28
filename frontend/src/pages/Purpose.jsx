import "../css/Purpose.css";

function Purpose() {
  return (
    <div className="purpose-container">
      <h1> Why use Moviegator?</h1>
      <p className="responsive-text">
        Simply put, Moviegator helps you keep track of some of your favorite
        movies that you've watched.
      </p>
      <p className="responsive-text">
        You can add the movies you've watched as favorites, and they will be
        stored locally in the browser and can be found under the favorites page.
      </p>
      <p className="responsive-text">
        No login is required for this action, but data will be lost if you
        change browser or device!
      </p>
      <p className="responsive-text">
        If you don't want to lose the data, you can login so it gets saved
        online, in which case you'll have access to it from anywhere. The local
        and online favorites are always synced.
      </p>
      <p className="responsive-text">
        The current most popular movies are displayed on the front page of the
        website with their public rating. You can view their trailers and any
        movie you find on the platform.
      </p>
      <p className="responsive-text">
        You can also search for any specific movie out there if you wish to do
        so
      </p>
      <p className="responsive-text">
        On your favorites tab, you can press on{" "}
        <b style={{ color: "red" }}>I'm feeling Lucky"</b> button to get
        suggestions of new movies to watch based on your favorites.
      </p>
      <p className="responsive-text">
        For any inquiries contact me at{" "}
        <a href="mailto:abel97.ag@gmail.com?subject=Hello%20Abel">
          abel97.ag@gmail.com
        </a>
      </p>
      <p className="responsive-text">
        This application uses the API from
        <a href="https://www.themoviedb.org/" target="_blank">
          The Movie Database(TMDB)
        </a>
        , but is independently developed and not affiliated with them.
      </p>
      <div className="tmdb-div">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="tmdb-logo" src="/tmdb.svg"></img>
        </a>
        <p className="responsive-text">꒷꒦︶꒷꒦︶ ๋ ࣭ ⭑꒷꒦</p>
      </div>
      
    </div>
  );
}

export default Purpose;
