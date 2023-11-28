import React, { useState, useEffect } from 'react';

type LogNode = {
    message: string;
    children: LogNode[];
};

type LogNodeProps = {
    node: LogNode;
};

const LogNodeView: React.FC<LogNodeProps> = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const formattedMessage = formatMessage(node.message);
    const messageClass = getMessageClass(node.message);

    return (
        <li>
            <span onClick={toggleOpen} style={{ cursor: 'pointer', fontWeight: 'bolder', color: 'white', background: 'green', marginRight: '5px', position: 'absolute' }}>
                {node.children.length > 0 && (isOpen ? '[-]' : '[+]')}
            </span>
            <span className={messageClass} style={{
                marginLeft: node.children.length > 0 ? '40px' : '40px'
            }}>{formattedMessage}
                <span style={{
                    padding: '0 5px',
                    fontWeight: 'bold',
                    background: 'white',
                    float: 'left'
                }}>
                    {node.children.length > 0 && "(" + node.children.length + ")"}
                </span>
            </span>
            {isOpen && node.children.length > 0 && (
                <ul>
                    {node.children.map((child, index) => (
                        <LogNodeView key={index} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const formatMessage = (message: string): JSX.Element => {
    const parts = message.split(/(\[.*?\])/).filter(Boolean);
    return (
        <>
            {parts.map((part, index) =>
                part.startsWith('[') && part.endsWith(']') && part.length > 3 ? (
                    <span key={index} className="highlight-brackets">{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    );
};

const getMessageClass = (message: string): string => {
    if (message.includes('Error')) return 'log-message log-error';
    if (message.includes('Warning')) return 'log-message log-warning';
    return 'log-message log-info';
};

type LogTreeViewProps = {
    nodes: LogNode[];
    filter: string;
};

const LogTreeView: React.FC<LogTreeViewProps> = ({ nodes, filter }) => {
    const [filteredNodes, setFilteredNodes] = useState<LogNode[]>([]);

    useEffect(() => {
        setFilteredNodes(filterNodes(nodes, filter));
    }, [nodes, filter]);

    return (
        <ul className="log-tree-view">
            {filteredNodes.map((node, index) => (
                <LogNodeView key={index} node={node} />
            ))}
        </ul>
    );
};

const filterNodes = (nodes: LogNode[], filter: string): LogNode[] => {
    if (!filter) return nodes;

    return nodes.reduce((acc: LogNode[], node) => {
        if (node.message.toLowerCase().includes(filter.toLowerCase())) {
            acc.push(node);
        } else if (node.children.length > 0) {
            const filteredChildren = filterNodes(node.children, filter);
            if (filteredChildren.length > 0) {
                acc.push({ ...node, children: filteredChildren });
            }
        }
        return acc;
    }, []);
};

export default LogTreeView;
