import html from '../core.js';
import Header from '../components/Header.js';
import TodoList from '../components/TodoList.js';
import Footer from '../components/Footer.js';
import { connect } from '../store.js'



function App({ todos }) {
    return html`
        <section class="todoapp">
            ${Header()}            
            ${todos.length > 0 && TodoList()}            
            ${todos.length > 0 && Footer()}            
        </section>
    `
}


export default connect()(App);