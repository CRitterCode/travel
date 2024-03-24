class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `

    <footer>
        <nav>
<!--            <a href="../html/about.html">About</a>-->
            <a href="../html/SuitecasePacking.html">Suitecase packing</a>
<!--            <a href="../html/Aktivities.html">Aktivities</a>-->
            <a href="../html/destination.html">Travel destination</a>
<!--            <a href="../html/Budget.html">Budget</a>-->
        </nav>
    </footer>
        `;
    }
}

customElements.define('footer-component', Footer);