import { TreeNode } from 'primeng/api';
import { ValuePair } from '../../../shared/models';

let KEY = 9;
export function getKey(): string {
  return String(++KEY);
}

export function valuePairsToTreeNodes(
  data: ValuePair[] | null,
  parent?: TreeNode
): TreeNode[] {
  return (data ?? []).reduce((nodes, { key, value }) => {
    if (typeof value === 'object') {
      const node: TreeNode = {
        key: getKey(),
        data: { key },
        expanded: true,
        parent,
      };
      node.children = valuePairsToTreeNodes(value, node);
      nodes.push(node);
    } else {
      nodes.push({
        key: getKey(),
        data: { key, value },
        parent,
      });
    }
    return nodes;
  }, [] as TreeNode[]);
}

export function treeNodesToValuePairs(data: TreeNode[] | null): ValuePair[] {
  return (data ?? []).reduce((pairs, node) => {
    const { key, value } = node.data;
    if (node.children) {
      pairs.push({
        key,
        value: treeNodesToValuePairs(node.children),
      });
    } else if (key) {
      pairs.push({ key, value });
    }
    return pairs;
  }, [] as ValuePair[]);
}
