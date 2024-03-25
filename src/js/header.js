import {initializeUI} from "./firebase/firebaseAuth.js";


class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="../html/index.html">
      <img src="../html/pics/homeWhite.png" alt="Home icon" width="30" height="30" class="d-inline-block align-top">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="./SuitecasePacking.html">Suitecase packing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="destination.html">Travel destination</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/status">Status</a>
        </li>
        <li class="nav-item">
                <button id='UserAuthLogOutBtn' type="button" class="btn btn-danger d-none">                  
                LogOut
                </button>
        </li>
        <li class="nav-item">
            <button id='UserAuthBtn' type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#loginModal">
            Login/ Register
            </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
                

            <!-- Modal -->
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div id="firebaseui-auth-container"></div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </header>
        `;
        initializeUI();


    }
}

customElements.define('header-component', Header);

