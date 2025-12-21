import React from 'react';

interface TextNode {
    type: 'text';
    value: string;
}

interface ContentNode {
    type: string;
    content?: TextNode[];
    children?: ContentNode[];
}

interface Props {
    items: ContentNode[];
    className?: string;
}

const ContentManager: React.FC<Props> = ({ items, className = '' }) => {
    const renderNode = (node: ContentNode, index: number): React.ReactNode => {
        if (node.type === 'paragraph') {
            const content = node.content || [];
            return (
                <p key={index}>
                    {content.map((textNode, i) => (
                        <span key={i}>{textNode.value}</span>
                    ))}
                </p>
            );
        }
        // Agregar más tipos de nodos según sea necesario
        return null;
    };

    return <div className={className}>{items.map(renderNode)}</div>;
};

export default ContentManager;
