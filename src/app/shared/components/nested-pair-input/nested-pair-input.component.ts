import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNode } from 'primeng/api';

import {
  getKey,
  treeNodesToValuePairs,
  valuePairsToTreeNodes,
} from './nested-pair';

interface T {
  key: string;
  value: string | T[];
}

function newTreeNode(partial?: TreeNode): TreeNode {
  return {
    key: getKey(),
    data: { key: '', value: '' },
    ...partial,
  };
}

@Component({
  selector: 'lib-nested-pair-input',
  templateUrl: './nested-pair-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedPairInputComponent),
      multi: true,
    },
  ],
})
export class NestedPairInputComponent implements ControlValueAccessor {
  @Input() fieldGrid: boolean = false;

  treeNodes: TreeNode[] = [];
  selectedNode: TreeNode | undefined = undefined;

  inputChanged = (v: T[]) => {};
  inputTouched = () => {};

  constructor() {
    this.writeValue(null);
  }

  writeValue(values: T[] | null) {
    this.treeNodes = values?.length
      ? valuePairsToTreeNodes(values)
      : [newTreeNode()];
    this.treeNodes[0].key = '1'; // Root
  }

  registerOnChange(fn: (v: T[]) => void) {
    this.inputChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.inputTouched = fn;
  }

  ngModelChange() {
    this.inputChanged(treeNodesToValuePairs(this.treeNodes));
  }

  isRootNode(node: TreeNode) {
    return node.key === '1';
  }

  addChildNode(pNode: TreeNode) {
    const cNode: TreeNode = newTreeNode({ parent: pNode });
    if (!pNode.children) {
      pNode.children = [];
      pNode.expanded = true;
    }
    pNode.children.push(cNode);
    this.selectedNode = cNode;
  }

  addSiblingNode(pNode?: TreeNode) {
    const cNode: TreeNode = newTreeNode({ parent: pNode });
    if (pNode) {
      pNode.children?.push(cNode);
    } else {
      this.treeNodes.push(cNode);
    }
    this.selectedNode = cNode;
  }

  removeNode(cNode: TreeNode) {
    const pNode = cNode.parent;
    if (pNode) {
      const children = pNode.children?.filter(
        (node) => node.key !== cNode?.key
      );
      pNode.children = children?.length ? children : undefined;
    } else {
      this.treeNodes = this.treeNodes.filter((node) => node.key !== cNode?.key);
    }
    if (!this.treeNodes.length) {
      this.treeNodes.push(newTreeNode());
    }
    this.ngModelChange();
  }
}
