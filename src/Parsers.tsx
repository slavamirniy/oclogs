export type LogNode = {
    message: string;
    children: LogNode[];
};

export function parseUnityLog(logText: string): LogNode[] {
    const tree: LogNode[] = [];
    const stack: LogNode[][] = [tree];
    let lastIndent = -1;

    logText.split('\n').forEach((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            return;
        }

        const indent = line.length - trimmedLine.length;
        const newNode: LogNode = { message: trimmedLine, children: [] };

        if (indent > lastIndent) {
            const lastNode = stack[stack.length - 1];
            if (lastNode.length > 0) {
                lastNode[lastNode.length - 1].children.push(newNode);
                stack.push(newNode.children);
            }
        } else {
            while (indent < lastIndent && stack.length > 1) {
                stack.pop();
                lastIndent -= 1;
            }
            stack[stack.length - 1].push(newNode);
        }

        lastIndent = indent;
    });

    return tree;
}
