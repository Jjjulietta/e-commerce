import React, { useContext, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { defaultProducts, sortAlfAsc, sortAlfDesc } from '../requests';
import { Obj } from '../productsStore';

type Options = {
    label: string;
    value: string;
};

const SortingAl: React.FC = observer(() => {
    const products = useContext(Context);
    const options: Options[] = [
        { label: 'от А -> Я', value: 'от А -> Я' },
        { label: 'от Я -> А', value: 'от Я -> А' },
    ];

    options.push({ label: 'default', value: 'default' });
    const [value3, setValue3] = useState('default');

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio3 checked', value);
        setValue3(value);
        console.log(value);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        hundleEvent(value);
    };
    const hundleEvent = async (value: string) => {
        console.log('click');
        console.log(value);
        const types = products.products.getTypes();
        let categories = products.products.getCategory();
        const categoryActive = products.products.getCategoryActive();
        if (categoryActive) {
            categories = categoryActive;
        }
        const attrActiveA = products.products.getActiveAttributes();
        const args: string[] = [];
        // let args: string = ``;
        attrActiveA.forEach((i) => {
            let str = `variants.attributes.${i.name}:`;
            i.value.forEach((val) => {
                str += `"${val}",`;
            });
            args.push(`${str.slice(0, str.length - 1)}`);
        });
        let str = `categories.id: `;
        categories.forEach((c) => {
            str += `"${c.id}",`;
        });
        args.push(`${str.slice(0, str.length - 1)}`);
        if (types.length === 1) {
            const strId = `productType.id: "${types[0].id}"`;
            args.push(strId);
        }
        console.log(args);
        if (value === 'от А -> Я') {
            console.log(value);
            sortAlfAsc(args).then(({ body }) => {
                const arr = body.results.map((item) => {
                    /* const catId = categories.find((i) => i.id === item.categories[0].id);
                    if (catId) { */
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        description: item.description,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                    // return undefined;
                });
                console.log(arr);
                const b = arr.flat().filter((item) => item !== undefined);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const c: any = [];
                b.forEach((item) => {
                    if (item) {
                        c.push(item);
                    }
                });
                console.log(c);
                if (arr) products.products.setProducts(arr);
            });
        } else if (value === 'от Я -> А') {
            console.log(value);
            sortAlfDesc(args).then(({ body }) => {
                const arr = body.results.map((item) => {
                    /* const catId = categories.find((i) => i.id === item.categories[0].id);
                    if (catId) { */
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        description: item.description,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                    /* }
                    return undefined; */
                });
                console.log(arr);
                // const b = arr.flat().filter((item) => item !== undefined);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                /* const c: any = [];
                b.forEach((item) => {
                    if (item) {
                        c.push(item);
                    }
                });
                console.log(c); */
                if (arr) products.products.setProducts(arr);
            });
        } else if (value === 'default') {
            const argsDef: Obj[] = await defaultProducts(args);
            products.products.setProducts(argsDef);
        }
    };

    return (
        <div className="types_bar">
            <Radio.Group
                options={options}
                buttonStyle="solid"
                defaultValue={'default'}
                onChange={onChange3}
                value={value3}
                optionType="button"
            />
            <br />
            <br />
        </div>
    );
});

export default SortingAl;