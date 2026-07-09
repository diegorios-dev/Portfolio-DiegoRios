import React from 'react';

interface TextNode {
    type: 'text';
    value: string;
}

interface StrongNode {
    type: 'strong';
    value: string;
}

interface ContentNode {
    type: string;
    content?: Array<TextNode | StrongNode>;
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
                        textNode.type === 'strong' ? (
                            <strong key={i}>{textNode.value}</strong>
                        ) : (
                            <span key={i}>{textNode.value}</span>
                        )
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
