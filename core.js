export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),[first]
    )
        .filter(x => x && x !== true || x == 0)
        .join("")
}

export function createStore(reducer) {
    let state = reducer();
    const roots = new Map();

    //Render component ra root
    function render() {
        for (const [root, component] of roots) {
            const output = component();
            root.innerHTML = output;
        }
    }
    return {
        //1. Nhận view và đẩy dl ra root 
        attach(component, root) {
            roots.set(root, component); // root: key, component : value
            render();
        },

        //2. Đẩy dl từ store vào view 
        connect(selector = state => state) { //Lựa chọn tp render ra view , mặc định là tất cả (state)
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args))
        },
        // new Call
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        }
    }
}