export namespace componentHp {
    export const createTopProps = <T extends {}>(props: T) => {
        return Object.assign(
            {
                key: undefined,
                ref: undefined
            },
            props
        );
    }
}