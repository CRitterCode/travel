import {initializeUI} from "./firebase/firebaseAuth.js";


class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
                <div class="menu-bar">    
                    <div class="logo-container">
                        <a href="./index.html"> <img  id="logo" src="./pics/earth-logo.png" alt="Logo"/></a>
                        <!--<h1>Plan2Travel4u</h1> -->
                    </div>
                    <ul>
                        <li><a href="../html/index.html"><img src="../html/pics/homeWhite.png" alt="Home icon"></a></li>
                        <li><a href="./SuitecasePacking.html">Suitecase packing</a></li>
<!--                        <li><a href="Aktivities.html">Aktivities</a></li>-->
<!--                         <li><a href="Budget.html">Budget</a></li>-->
                        <li><a href="destination.html">Travel destination</a></li>
                    </ul>
                     <div class="searchbox">
<!--                    <form action="" method="post">-->
<!--                        <label>-->
<!--                            <input type="text" name="search" placeholder="Search...">-->
<!--                            <button type="submit"><img src="./pics/searchicon.png" alt="Search button"></button>-->
<!--                        </label>-->

<!--                    </form>-->
                </div>
                </div>
                    <div id="firebaseui-auth-container"></div>

        </header>
        `;
        initializeUI();
    }
}

customElements.define('header-component', Header);

