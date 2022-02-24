/*
ValuePair interface is referred as ValuePair or NestedPair in function names.
  ValuePair is when { key: string; value: string; }
  NestedPair is when { key: string; value: string | ValuePair[]; }

  So, every ValuePair is a NestedPair.
*/
export interface ValuePair {
  key: string;
  value: string | ValuePair[];
}

export function emptyValuePair(): ValuePair {
  return { key: '', value: '' };
}

export function emptyNestedPair(): ValuePair {
  return { key: '', value: [] };
}

/*
Value Formats:
  String: "{'foo':'bar'},{'far':'baz'}"
          "{'foo':'bar','far':'baz'}"
  ValuePair: [{ key: 'foo', value: 'bar' }, { key: 'far', value: 'baz' }]
  Objectify: { foo: 'bar', far: 'baz }

Nested Formats:
  String: "{'horizon':'3','resources':{'requests':{'cpu':'200m','memory':'1024Mi'}}}"
  ValuePair: [
      { key: 'horizon', value: '3' },
      { key: 'resources', value: [
        { key: 'requests', value: [
          { key: 'cpu', value: '200m' },
          { key: 'memory', value: '1024Mi' }
        ]}
      ]},
    ]
  Objectify: {
      'horizon': '3',
      'resources': {
        'requests': {'cpu': '200m', 'memory': '1024Mi'}
      }
    }
*/

export function valuePairParse(str: string | null): ValuePair[] {
  // JSON parse expects double-quote
  str = str ? str.replace(/'/gi, '"') : null;
  try {
    return nestedPairParse(str);
  } catch {
    try {
      const entries = JSON.parse('[' + str + ']');
      return entries.flatMap(objectToNestedPair);
    } catch (e) {
      console.error('ValuePair [parse]', e);
      throw e;
    }
  }
}

export function valuePairStringify(pairs: ValuePair[] | null): string {
  return JSON.stringify(nestedPairObjectify(pairs));
}

export function valuePairObjectify(
  pairs: ValuePair[] | null
): Record<string, string> {
  return nestedPairObjectify(pairs);
}

export function nestedPairParse(str: string | null): ValuePair[] {
  if (str?.length) {
    return objectToNestedPair(JSON.parse(str));
  }
  return [];
}

export function nestedPairStringify(pairs: ValuePair[] | null): string {
  return JSON.stringify(nestedPairObjectify(pairs));
}

export function nestedPairObjectify(
  pairs: ValuePair[] | null
): Record<string, any> {
  if (pairs?.length) {
    return pairs.reduce((obj, { key, value }) => {
      if (typeof value === 'object') {
        obj[key] = nestedPairObjectify(value);
      } else {
        obj[key] = value;
      }
      return obj;
    }, {} as Record<string, any>);
  }
  return {};
}

export function objectToNestedPair(record: Record<string, any>): ValuePair[] {
  return Object.entries(record).reduce((pairs, [key, value]) => {
    if (typeof value === 'object') {
      pairs.push({ key, value: objectToNestedPair(value) });
    } else {
      pairs.push({ key, value });
    }
    return pairs;
  }, [] as ValuePair[]);
}
