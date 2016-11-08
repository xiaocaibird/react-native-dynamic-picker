export var componentHp;
(function (componentHp) {
    componentHp.createTopProps = (props) => {
        return Object.assign({
            key: undefined,
            ref: undefined
        }, props);
    };
})(componentHp || (componentHp = {}));
